<?php

namespace App\Http\Resources;

class UserResource extends CommonResource
{
    public function toArray($request)
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'login' => $this->login,
            'email' => $this->email,
            'api_token' => $this->when($this->api_token, $this->api_token)
        ];
    }
}
