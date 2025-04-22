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
        Schema::create('log_reajustes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('empreendimento_id')->constrained()->onDelete('cascade');
            $table->decimal('percentual', 5, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_reajustes');
    }
};
