<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('unidades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empreendimento_id')->constrained()->onDelete('restrict');
            $table->string('codigo')->unique();
            $table->string('bloco');
            $table->decimal('preco_venda', 12, 2);
            $table->enum('status', ['DISPONIVEL', 'RESERVADA', 'VENDIDA'])->default('DISPONIVEL');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('unidades');
    }
};