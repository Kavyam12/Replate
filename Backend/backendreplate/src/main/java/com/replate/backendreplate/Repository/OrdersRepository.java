package com.replate.backendreplate.Repository;

import com.replate.backendreplate.Model.OrderStatus;
import com.replate.backendreplate.Model.Orders;
import com.replate.backendreplate.Model.PaymentStatus;
import com.replate.backendreplate.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

        List<Orders> findByStatusIn(List<OrderStatus> statuses);

        List<Orders> findByRestaurantNameAndStatusIn(String restaurantName, List<OrderStatus> statuses);

        List<Orders> findByRestaurantIdAndStatusIn(Long restaurantId, List<OrderStatus> statuses);

        Long countByRestaurantIdAndStatus(
                        Long restaurantId,
                        OrderStatus status);

        @Query("""
                        SELECT COALESCE(SUM(o.totalAmount), 0)
                        FROM Orders o
                        WHERE o.restaurantId = :restaurantId
                                    AND o.paymentStatus = :paymentStatus
                        """)
        Double calculateRevenue(
                        @Param("restaurantId") Long restaurantId,
                        @Param("paymentStatus") PaymentStatus status);

        @Query("""

                            SELECT COUNT(o)
                            FROM Orders o
                            WHERE o.restaurantId = :restaurantId
                            AND o.status IN :statuses
                        """)
        Long countPendingPickups(
                        @Param("restaurantId") Long restaurantId,
                        @Param("statuses") List<OrderStatus> statuses);
}
