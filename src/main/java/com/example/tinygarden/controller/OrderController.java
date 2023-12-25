package com.example.tinygarden.controller;

import com.example.tinygarden.dto.OrderDto;
import com.example.tinygarden.entity.Order;
import com.example.tinygarden.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public List<Order> getAllData() {
        return orderService.getAll();
    }

    @GetMapping("/get-by-id/{orderId}")
    public Optional<Order> getById(@PathVariable("orderId") Integer orderId) {
        return orderService.getById(orderId);
    }

    @DeleteMapping("/delete-by-id/{orderId}")
    public String deleteById(@PathVariable("orderId") Integer orderId) {
        orderService.deleteById(orderId);
        return "Order deleted";
    }
}
