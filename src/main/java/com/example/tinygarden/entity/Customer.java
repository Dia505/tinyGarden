package com.example.tinygarden.entity;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

@Table(name = "Customer", uniqueConstraints = {
        @UniqueConstraint(name = "UNIQUE_customer_email", columnNames = "email"),
        @UniqueConstraint(name = "UNIQUE_customer_mobileNo", columnNames = "mobileNo")
})

public class Customer {
    @Id
    @SequenceGenerator(name = "customer_seq_gen", sequenceName = "customer_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "customer_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer customerId;

    @Column(name = "fullname", nullable = false)
    private String fullName;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "mobile_no", nullable = false)
    private String mobileNo;

    @Column(name = "password", nullable = false)
    private String password;

}
