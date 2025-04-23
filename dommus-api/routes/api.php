<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmpreendimentoController;
use App\Http\Controllers\Api\UnidadeController;

// Rotas públicas de login/register
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post ('logout', [AuthController::class, 'logout']);
    Route::get  ('user',   [AuthController::class, 'user']);

    // Empreendimentos
    Route::apiResource('empreendimentos', EmpreendimentoController::class);
    Route::post('empreendimentos/{id}/unidades-lote',    [EmpreendimentoController::class, 'criarUnidadesEmLote']);
    Route::post('empreendimentos/{id}/atualizar-precos', [EmpreendimentoController::class, 'atualizarPrecoUnidades']);

    // Unidades
    Route::apiResource('unidades', UnidadeController::class);
});
