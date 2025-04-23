<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Empreendimento;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmpreendimentoController extends Controller
{
    public function index(Request $request)
    {
        $query = Empreendimento::query();

        // Filtros
        if ($request->has('codigo')) {
            $query->where('codigo', 'like', '%' . $request->codigo . '%');
        }

        if ($request->has('nome')) {
            $query->where('nome', 'like', '%' . $request->nome . '%');
        }

        if ($request->has('cidade')) {
            $query->where('cidade', 'like', '%' . $request->cidade . '%');
        }

        $empreendimentos = $query->paginate(10);

        // Adicionando informações extras
        foreach ($empreendimentos as $empreendimento) {
            $empreendimento->vgv_vendidas = $empreendimento->vgvVendidas;
            $empreendimento->vgv_reservadas = $empreendimento->vgvReservadas;
            $empreendimento->estoque_disponivel = $empreendimento->estoqueDisponivel;
        }

        return response()->json($empreendimentos);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'codigo' => 'required|string|unique:empreendimentos',
            'nome' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'previsao_entrega' => 'required|date',
        ]);

        $empreendimento = Empreendimento::create($validatedData);

        return response()->json($empreendimento, 201);
    }

    public function show($id)
    {
        $empreendimento = Empreendimento::findOrFail($id);
        $empreendimento->vgv_vendidas = $empreendimento->vgvVendidas;
        $empreendimento->vgv_reservadas = $empreendimento->vgvReservadas;
        $empreendimento->estoque_disponivel = $empreendimento->estoqueDisponivel;

        return response()->json($empreendimento);
    }

    public function update(Request $request, $id)
    {
        $empreendimento = Empreendimento::findOrFail($id);

        $validatedData = $request->validate([
            'codigo' => 'required|string|unique:empreendimentos,codigo,' . $id,
            'nome' => 'required|string|max:255',
            'cidade' => 'required|string|max:255',
            'previsao_entrega' => 'required|date',
        ]);

        $empreendimento->update($validatedData);

        return response()->json($empreendimento);
    }

    public function destroy($id)
    {
        $empreendimento = Empreendimento::findOrFail($id);

        // Verificar se existem unidades vendidas ou reservadas
        $vendidasOuReservadas = $empreendimento->unidades()
            ->whereIn('status', ['VENDIDA', 'RESERVADA'])
            ->exists();

        if ($vendidasOuReservadas) {
            return response()->json([
                'message' => 'Não é possível excluir empreendimentos com unidades vendidas ou reservadas'
            ], 422);
        }

        $empreendimento->delete();

        return response()->json(null, 204);
    }

    public function criarUnidadesEmLote(Request $request, $id)
    {
        $validatedData = $request->validate([
            'quantidade_blocos' => 'required|integer|min:1',
            'unidades_por_bloco' => 'required|integer|min:1',
            'preco_venda' => 'required|numeric|min:0',
        ]);

        $empreendimento = Empreendimento::findOrFail($id);
        $quantidadeBlocos = $validatedData['quantidade_blocos'];
        $unidadesPorBloco = $validatedData['unidades_por_bloco'];
        $precoVenda = $validatedData['preco_venda'];

        $unidades = [];

        DB::transaction(function () use ($empreendimento, $quantidadeBlocos, $unidadesPorBloco, $precoVenda, &$unidades) {
            for ($bloco = 1; $bloco <= $quantidadeBlocos; $bloco++) {
                $blocoLetra = chr(64 + $bloco); // Converte número para letra (1=A, 2=B, etc)

                for ($i = 1; $i <= $unidadesPorBloco; $i++) {
                    $codigoUnidade = $empreendimento->codigo . '-' . $blocoLetra . '-' . str_pad($i, 3, '0', STR_PAD_LEFT);
                    
                    $unidade = $empreendimento->unidades()->create([
                        'codigo' => $codigoUnidade,
                        'bloco' => $blocoLetra,
                        'preco_venda' => $precoVenda,
                        'status' => 'DISPONIVEL'
                    ]);
                    
                    $unidades[] = $unidade;
                }
            }
        });

        return response()->json([
            'message' => 'Unidades criadas com sucesso',
            'quantidade' => count($unidades)
        ], 201);
    }

    public function atualizarPrecoUnidades(Request $request, $id)
    {
        $validatedData = $request->validate([
            'percentual_reajuste' => 'required|numeric|min:0',
        ]);

        $empreendimento = Empreendimento::findOrFail($id);
        $percentual = $validatedData['percentual_reajuste'];

        DB::transaction(function () use ($empreendimento, $percentual) {
            // Atualizar apenas unidades disponíveis
            $empreendimento->unidades()
                ->where('status', 'DISPONIVEL')
                ->update([
                    'preco_venda' => DB::raw("preco_venda * (1 + {$percentual}/100)")
                ]);

            // Registrar log de reajuste
            $empreendimento->reajusteLogs()->create([
                'percentual' => $percentual
            ]);
        });

        return response()->json([
            'message' => 'Preços atualizados com sucesso',
            'percentual_aplicado' => $percentual
        ]);
    }
}