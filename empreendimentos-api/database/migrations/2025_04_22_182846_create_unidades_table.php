<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('unidades', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique();
            $table->string('bloco');
            $table->decimal('preco_venda', 12, 2);
            $table->enum('status', ['VENDIDA','DISPONIVEL','RESERVADA'])
                  ->default('DISPONIVEL');
            $table->foreignId('empreendimento_id')
                  ->constrained('empreendimentos')
                  ->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unidades');
    }
};
