package com.example.tinygarden;

import com.example.tinygarden.entity.Customer;
import com.example.tinygarden.repository.CustomerRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.util.List;
import java.util.Optional;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CustomerRepositoryTest {
    @Autowired
    private CustomerRepository customerRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void save() {
        Customer customer = new Customer();

        customer.setCustomerId(1);
        customer.setFullName("Test name");
        customer.setAddress("Test address");
        customer.setMobileNo("123");
        customer.setEmail("Test email");
        customer.setPassword("Test password");

        customer = customerRepository.save(customer);

        Assertions.assertThat(customer.getCustomerId()).isGreaterThan(0);
    }

    @Test
    @Order(2)
    public void findAll() {
        List<Customer> customerList = customerRepository.findAll();
        Assertions.assertThat(customerList.size()).isGreaterThan(0);
    }

    @Test
    @Order(3)
    public void findById() {
        Customer customer = customerRepository.findById(1).get();
        Assertions.assertThat(customer.getCustomerId()).isEqualTo(1);
    }

    @Test
    @Order(4)
    @Rollback(value = false)
    public void updateProfile() {
        Customer customer = customerRepository.findById(1).get();
        customer.setAddress("Updated test address");
        customer = customerRepository.save(customer);

        Assertions.assertThat(customer.getAddress()).isEqualTo("Updated test address");
    }

    @Test
    @Order(5)
    public void deleteById() {
        customerRepository.deleteById(1);

        Customer customer1 = null;
        Optional<Customer> customer = customerRepository.findById(1);

        if(customer.isPresent()) {
            customer1 = customer.get();
        }

        Assertions.assertThat(customer1).isNull();
    }
}
