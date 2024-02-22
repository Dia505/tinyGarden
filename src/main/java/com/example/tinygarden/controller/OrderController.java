package com.example.tinygarden.controller;

import com.example.tinygarden.dto.OrderDto;
import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.entity.Order;
import com.example.tinygarden.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/enter-order")
    public String enterOrder(@RequestBody OrderDto orderDto) {
        orderService.save(orderDto);
        return "Order entered";
    }

    @GetMapping("/get-all-order")
    public List<OrderDto> getAllData() {
        return orderService.getAll();
    }

    @GetMapping("/get-by-id/{orderId}")
    public List<OrderDto> getById(@PathVariable("orderId") Integer orderId) {
        return orderService.getById(orderId);
    }

    @GetMapping("/retrieve-order-by-customerId/{customerId}")
    public List<OrderDto> getByCustomerId(@PathVariable("customerId") Integer customerId) {
        return orderService.getByCustomerId(customerId);
    }

    @DeleteMapping("/delete-by-id/{orderId}")
    public String deleteById(@PathVariable("orderId") Integer orderId) {
        orderService.deleteById(orderId);
        return "Order deleted";
    }

    @GetMapping("/order-record")
    public ResponseEntity<Object> findAllRecords() {
        List<OrderDto> orders = orderService.getAll();
        int totalRecords = orders.size();
        Map<String, Object> response = new HashMap<>();
        response.put("totalRecords", totalRecords);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
