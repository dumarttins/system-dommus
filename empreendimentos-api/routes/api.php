<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmpreendimentoController;
use App\Http\Controllers\Api\UnidadeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui você registra suas rotas API. Todas as rotas ficam
| protegidas pelo middleware auth:sanctum.
|
*/

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);

    // Empreendimentos
    Route::apiResource('empreendimentos', EmpreendimentoController::class);
    Route::post('empreendimentos/{empreendimento}/reajustar', [EmpreendimentoController::class, 'reajustarPrecos']);
    Route::post('empreendimentos/{empreendimento}/unidades-lote', [UnidadeController::class, 'criarLote']);

    // Unidades
    Route::apiResource('unidades', UnidadeController::class);
});
