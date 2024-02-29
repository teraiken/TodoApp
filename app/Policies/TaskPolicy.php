<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Task;
use App\Models\User;

class TaskPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function checkUser(User $user, Task $task): bool
    {
        return ($user->id === $task->user_id);
    }
}
