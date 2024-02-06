package com.example.tinygarden.entity;
import jakarta.persistence.*;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "role")
public class Role {
    @Id
    @SequenceGenerator(name = "role_seq_gen", sequenceName = "role_id_seq", allocationSize = 1)
    @GeneratedValue(generator = "role_seq_gen", strategy = GenerationType.SEQUENCE)
    private Integer roleId;

    @Column(name = "roleName", nullable = false)
    private String roleName;
}
