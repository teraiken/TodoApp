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
    public function 一覧を取得することができる(): void
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->getJson('api/tasks');

        $response->assertOk()->assertJsonCount($tasks->count());
    }

    /**
     * @test
     * 
     * @return void
     */
    public function 登録することができる(): void
    {
        $data = [
            'title' => 'テスト投稿'
        ];

        $response = $this->postJson('api/tasks', $data);

        $response->assertCreated()->assertJsonFragment($data);
    }

    /**
     * @test
     * 
     * @return void
     */
    public function タイトルが空の場合は登録することができない(): void
    {
        $data = [
            'title' => ''
        ];

        $response = $this->postJson('api/tasks', $data);

        $response->assertStatus(422)->assertJsonValidationErrors(
            ['title' => 'タイトルは必ず指定してください']
        );
    }

    /**
     * @test
     * 
     * @return void
     */
    public function タイトルが255文字を超える場合は登録することができない(): void
    {
        $data = [
            'title' => str_repeat('あ', 256)
        ];

        $response = $this->postJson('api/tasks', $data);

        $response->assertStatus(422)->assertJsonValidationErrors(
            ['title' => 'タイトルは、255文字以下で指定してください。']
        );
    }

    /**
     * @test
     * 
     * @return void
     */
    public function 更新することができる(): void
    {
        $task = Task::factory()->create();

        $task->title = '書き換え';

        $response = $this->patchJson("api/tasks/{$task->id}", $task->toArray());

        $response->assertOk()->assertJsonFragment($task->toArray());
    }

    /**
     * @test
     * 
     * @return void
     */
    public function 削除することができる(): void
    {
        $tasks = Task::factory()->count(10)->create();

        $response = $this->deleteJson("api/tasks/1");
        $response->assertOk();

        $response = $this->getJson('api/tasks');
        $response->assertJsonCount($tasks->count() - 1);
    }
}
