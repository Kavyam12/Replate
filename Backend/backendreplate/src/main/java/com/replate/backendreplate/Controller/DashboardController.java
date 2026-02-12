package com.replate.backendreplate.Controller;

import com.replate.backendreplate.Service.DashboardService;
import com.replate.backendreplate.dto.DashboardRecentListingsResponse;
import com.replate.backendreplate.dto.DashboardSummaryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.security.authorization.AuthorityReactiveAuthorizationManager.hasRole;

@RestController
@RequestMapping("/donor")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/kpi")
    @PreAuthorize("hasRole('RESTAURANT')")
    public DashboardSummaryResponse getDashboardSummary(){
        return dashboardService.getDashboardSummary();
    }

    @GetMapping("/recentListings")
    @PreAuthorize("hasRole('RESTAURANT')")
    public List<DashboardRecentListingsResponse> getRecentListings() {
        return dashboardService.getRecentListings();
    }
}
