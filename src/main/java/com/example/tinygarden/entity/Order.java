package com.example.tinygarden.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @SequenceGenerator(name = "order_seq_gen", sequenceName = "order_orderId_seq", allocationSize = 1)
    @GeneratedValue(generator = "order_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer orderId;

    @ManyToOne
    @JoinColumn(name = "customerId")
    private Customer customer;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "totalPrice", nullable = false)
    private Double totalPrice;
}
