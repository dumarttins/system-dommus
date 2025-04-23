<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unidade;
use Illuminate\Http\Request;

class UnidadeController extends Controller
{
    public function index(Request $request)
    {
        $query = Unidade::query();

        try {
            // Filtro por empreendimento
            if ($request->filled('empreendimento_id') && $request->empreendimento_id !== '') {
                $query->where('empreendimento_id', (int) $request->empreendimento_id);
            }

            // Filtro por código
            if ($request->filled('codigo') && $request->codigo !== '') {
                $query->where('codigo', 'like', '%' . $request->codigo . '%');
            }

            // Filtro por faixa de preço
            if (
                $request->filled('preco_min') && $request->preco_min !== '' &&
                $request->filled('preco_max') && $request->preco_max !== ''
            ) {
                $query->whereBetween('preco_venda', [$request->preco_min, $request->preco_max]);
            } elseif ($request->filled('preco_min') && $request->preco_min !== '') {
                $query->where('preco_venda', '>=', $request->preco_min);
            } elseif ($request->filled('preco_max') && $request->preco_max !== '') {
                $query->where('preco_venda', '<=', $request->preco_max);
            }

            // Filtro por status
            if ($request->filled('status') && $request->status !== '') {
                $query->where('status', $request->status);
            }

            // Filtro por bloco
            if ($request->filled('bloco') && $request->bloco !== '') {
                $query->where('bloco', $request->bloco);
            }

            $unidades = $query->with('empreendimento')->paginate(15);

            info('SQL:', [$query->toSql()]);
            info('Resultado:', [$unidades]);

            return response()->json($unidades);
        } catch (\Throwable $th) {
            info('Erro:', [$th->getMessage()]);
            return response()->json([
                'message' => 'Erro ao buscar unidades',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'empreendimento_id' => 'required|exists:empreendimentos,id',
            'codigo' => 'required|string|unique:unidades',
            'bloco' => 'required|string',
            'preco_venda' => 'required|numeric|min:0',
            'status' => 'required|in:DISPONIVEL,RESERVADA,VENDIDA',
        ]);

        $unidade = Unidade::create($validatedData);

        return response()->json($unidade, 201);
    }

    public function show($id)
    {
        $unidade = Unidade::with('empreendimento')->findOrFail($id);

        return response()->json($unidade);
    }

    public function update(Request $request, $id)
    {
        $unidade = Unidade::findOrFail($id);

        $validatedData = $request->validate([
            'empreendimento_id' => 'required|exists:empreendimentos,id',
            'codigo' => 'required|string|unique:unidades,codigo,' . $id,
            'bloco' => 'required|string',
            'preco_venda' => 'required|numeric|min:0',
            'status' => 'required|in:DISPONIVEL,RESERVADA,VENDIDA',
        ]);

        $unidade->update($validatedData);

        return response()->json($unidade);
    }

    public function destroy($id)
    {
        $unidade = Unidade::findOrFail($id);

        if (!$unidade->podeSerExcluida()) {
            return response()->json([
                'message' => 'Não é possível excluir unidades vendidas ou reservadas'
            ], 422);
        }

        $unidade->delete();

        return response()->json(null, 204);
    }
}