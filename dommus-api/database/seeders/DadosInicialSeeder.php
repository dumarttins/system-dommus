<?php

namespace Database\Seeders;

use App\Models\Empreendimento;
use App\Models\Unidade;
use Illuminate\Database\Seeder;

class DadosInicialSeeder extends Seeder
{
    public function run()
    {
        // Criar alguns empreendimentos
        $empreendimento1 = Empreendimento::create([
            'codigo' => 'EMPR001',
            'nome' => 'Residencial Bela Vista',
            'cidade' => 'São Paulo',
            'previsao_entrega' => '2025-12-31',
        ]);

        $empreendimento2 = Empreendimento::create([
            'codigo' => 'EMPR002',
            'nome' => 'Condomínio Solar das Flores',
            'cidade' => 'Rio de Janeiro',
            'previsao_entrega' => '2026-06-30',
        ]);

        // Criar algumas unidades para o primeiro empreendimento
        for ($bloco = 'A'; $bloco <= 'B'; $bloco++) {
            for ($i = 1; $i <= 10; $i++) {
                $status = 'DISPONIVEL';
                
                // Algumas unidades como vendidas ou reservadas
                if ($i % 5 == 0) {
                    $status = 'VENDIDA';
                } else if ($i % 3 == 0) {
                    $status = 'RESERVADA';
                }
                
                Unidade::create([
                    'empreendimento_id' => $empreendimento1->id,
                    'codigo' => "EMPR001-{$bloco}-" . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'bloco' => $bloco,
                    'preco_venda' => rand(300000, 700000),
                    'status' => $status
                ]);
            }
        }

        // Criar algumas unidades para o segundo empreendimento
        for ($bloco = 'A'; $bloco <= 'C'; $bloco++) {
            for ($i = 1; $i <= 8; $i++) {
                $status = 'DISPONIVEL';
                
                // Algumas unidades como vendidas ou reservadas
                if ($i % 4 == 0) {
                    $status = 'VENDIDA';
                } else if ($i % 2 == 0) {
                    $status = 'RESERVADA';
                }
                
                Unidade::create([
                    'empreendimento_id' => $empreendimento2->id,
                    'codigo' => "EMPR002-{$bloco}-" . str_pad($i, 3, '0', STR_PAD_LEFT),
                    'bloco' => $bloco,
                    'preco_venda' => rand(250000, 600000),
                    'status' => $status
                ]);
            }
        }
    }
}