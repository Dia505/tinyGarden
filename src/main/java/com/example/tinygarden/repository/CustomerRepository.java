package com.example.tinygarden.repository;

import com.example.tinygarden.entity.Customer;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "select * from customer where email=?1", nativeQuery = true)
    Optional<Customer> getUserByEmail(String email);

//    @Query(value = "SELECT EXISTS(SELECT 1 FROM customer WHERE email = ?1)", nativeQuery = true)
//    int emailExists(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE customer SET otp = ?1 WHERE email = ?2",nativeQuery = true)
    void updateOtp(String otp, String email);

    @Query(value = "SELECT otp from customer where email=?1",nativeQuery = true)
    String otp(String email);

    @Modifying
    @Transactional
    @Query(value = "UPDATE customer SET password = ?1 WHERE email = ?2",nativeQuery = true)
    void updatePassword(String password, String email);
}
