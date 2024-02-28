package com.example.tinygarden.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.stream.Collectors;

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

public class Customer implements UserDetails {
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles",
            foreignKey = @ForeignKey(name = "FK_customer_roles_customerId"),
            joinColumns = @JoinColumn(name = "customer_id", referencedColumnName = "customerId"),
            inverseForeignKey = @ForeignKey(name = "FK_customer_roles_roleId"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "roleId"),
            uniqueConstraints = @UniqueConstraint(name = "UNIQUE_customer_roles_customerIdRoleId",
                    columnNames = {"customer_id", "role_id"})
    )
    private Collection<Role> roles;

    private String otp;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles().stream().
                map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
