<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Empreendimento\{IndexRequest, StoreRequest, UpdateRequest, ReajusteRequest};
use App\Services\EmpreendimentoServiceInterface;

class EmpreendimentoController extends Controller
{
    public function __construct(private EmpreendimentoServiceInterface $service) {}

    public function index(IndexRequest $request)
    {
        $data = $this->service->list($request->validated(), $request->per_page);
        return response()->json($data);
    }

    public function store(StoreRequest $request)
    {
        $empre = $this->service->store($request->validated());
        return response()->json($empre, 201);
    }

    public function show($id)
    {
        return response()->json($this->service->get($id));
    }

    public function update(UpdateRequest $request, $id)
    {
        return response()->json($this->service->alter($id, $request->validated()));
    }

    public function destroy($id)
    {
        $this->service->remove($id);
        return response()->json([], 204);
    }

    public function reajustarPrecos(ReajusteRequest $request, $id)
    {
        $this->service->reajustarPrecos($id, $request->percentual);
        return response()->json([], 204);
    }
}
