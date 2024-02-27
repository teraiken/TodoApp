<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Task一覧
     * 
     * @return Collection
     */
    public function index(): Collection
    {
        return Task::orderByDesc('id')->get();
    }

    /**
     * Task登録
     * 
     * @param StoreTaskRequest $request
     * @return JsonResponse
     */
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $task = Task::create($request->all());

        return $task ? response()->json($task, 201) : response()->json([], 500);
    }

    /**
     * Task更新
     *
     * @param UpdateTaskRequest $request
     * @param Task $task
     * @return JsonResponse
     */
    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $task->title = $request->title;

        return $task->update() ? response()->json($task) : response()->json([], 500);
    }

    /**
     * Task削除
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function destroy(Task $task): JsonResponse
    {
        return $task->delete() ? response()->json($task) : response()->json([], 500);
    }
}
