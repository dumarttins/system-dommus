<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('empreendimentos', function (Blueprint $table) {
            $table->id();
            $table->string('codigo')->unique();
            $table->string('nome');
            $table->string('cidade');
            $table->date('previsao_entrega');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('empreendimentos');
    }
};