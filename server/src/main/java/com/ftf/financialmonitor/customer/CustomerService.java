package com.ftf.financialmonitor.customer;

import com.ftf.financialmonitor.exception.DuplicateResourceException;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import com.ftf.financialmonitor.registration.RegistrationRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with email \"%s\" not found".formatted(email)
                ));
    }

    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "customer with email \"%s\" not found".formatted(id)
                ));
    }

    @Transactional
    public void signUpCustomer(RegistrationRequest request) {
        if (customerRepository.existsByEmail(request.email())){
            throw new DuplicateResourceException(
                    "email \"%s\" has been already taken".formatted(request.email())
            );
        }

        String encodedPassword = bCryptPasswordEncoder.encode(request.password());

        Customer customer = Customer.builder()
                .email(request.email())
                .password(encodedPassword)
                .firstname(request.firstname())
                .surname(request.surname())
                .build();

        customerRepository.save(customer);
    }

    public CustomerDto getCurrentCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = getCustomerByEmail(authentication.getName());
        return new CustomerDto(customer.getFirstname(), customer.getSurname(), customer.getEmail(), customer.isEnabled());
    }

    public int enableCustomer(String email) {
        return customerRepository.enableCustomerWithEmail(email);
    }


}
