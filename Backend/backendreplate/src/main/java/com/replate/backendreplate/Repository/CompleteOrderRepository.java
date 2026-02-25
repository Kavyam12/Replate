package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.CompleteOrder;
import com.replate.backendreplate.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompleteOrderRepository extends JpaRepository<CompleteOrder, Long> {

    List<CompleteOrder> findByNgo (User ngo);

    List<CompleteOrder> findByNgoOrderByCreatedAtDesc(User ngo);
}
