package com.example.studentconnect.model;

import lombok.Data;

@Data
public class ReqStatusDTO {
    private Long requestId;
    private RequestStatus status;

}
