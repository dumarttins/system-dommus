<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reajuste_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empreendimento_id')->constrained();
            $table->decimal('percentual', 8, 4);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reajuste_logs');
    }
};