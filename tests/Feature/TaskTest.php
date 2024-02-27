<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     * 
     * @return void
     */
    public function 一覧を取得(): void
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->getJson('api/tasks');

        $response->assertOk()->assertJsonCount($tasks->count());
    }
}
