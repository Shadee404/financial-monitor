package com.ftf.financialmonitor.transactions.deposit;

import com.ftf.financialmonitor.customer.Customer;
import com.ftf.financialmonitor.customer.CustomerService;
import com.ftf.financialmonitor.exception.ResourceNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@AllArgsConstructor
@Service
public class DepositService {
    private DepositRepository depositRepository;
    private CustomerService customerService;

    public Deposit getDepositById(Long id) {
        return depositRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Deposit not found"));
    }

    public List<Deposit> getAllDepositsOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        return depositRepository.findAllByCustomerId(customer.getId());
    }

    @Transactional
    public void addDeposit(DepositDto DepositDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        Deposit deposit = depositDtoToEntity(DepositDto);
        deposit.setCustomerId(customer.getId());
        depositRepository.save(deposit);
    }

    @Transactional
    public void updateDeposit(DepositUpdate depositUpdate) {
        Deposit deposit = getDepositById(depositUpdate.id());
        deposit.setMoney(depositUpdate.money());
        deposit.setPercent(depositUpdate.percent());
        deposit.setEndTime(depositUpdate.endTime());
        depositRepository.save(deposit);
    }

    @Transactional
    public void deleteDepositById(Long id) {
        depositRepository.delete(getDepositById(id));
    }

    @Transactional
    public void deleteAllDepositsOfCustomer() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Customer customer = customerService.getCustomerByEmail(authentication.getName());
        depositRepository.deleteAllByCustomerId(customer.getId());
    }

    public DepositInfo getDepositInfo() {
        List<Deposit> deposits = getAllDepositsOfCustomer();

        if (deposits.size() != 0) {
            BigDecimal sumOfIncome = new BigDecimal(0);
            Deposit firstDeposit = deposits.get(0);

            for (Deposit deposit : deposits) {
                if (firstDeposit.getEndTime().isAfter(deposit.getEndTime())) {
                    firstDeposit = deposit;
                }

                sumOfIncome = sumOfIncome.add(deposit.getMoney()
                        .multiply(deposit.getPercent().multiply(new BigDecimal("0.000000003802570")))
                        .multiply(BigDecimal.valueOf(ChronoUnit.SECONDS.between(deposit.getCreationTime(), deposit.getEndTime()))
                                ));
            }

            return new DepositInfo(sumOfIncome, deposits.size(), firstDeposit.getEndTime());
        }

        return new DepositInfo(new BigDecimal(0), 0, LocalDateTime.MIN);
    }

    private Deposit depositDtoToEntity(DepositDto depositDto) {
        return Deposit.builder()
                .money(depositDto.getMoney())
                .percent(depositDto.getPercent())
                .creationTime(depositDto.getCreationTime())
                .endTime(depositDto.getEndTime())
                .build();
    }
}
