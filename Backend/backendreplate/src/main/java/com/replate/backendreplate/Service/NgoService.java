package com.replate.backendreplate.Service;

import com.replate.backendreplate.Model.Ngo;
import com.replate.backendreplate.Model.User;
import java.time.LocalDateTime;
import com.replate.backendreplate.Repository.NgoRepository;
import com.replate.backendreplate.dto.NgoProfileRequest;
import com.replate.backendreplate.dto.NgoProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NgoService {

    @Autowired
    private NgoRepository ngoRepository;

    public NgoProfileResponse getNgoProfile(User user) {

        NgoProfileResponse response = new NgoProfileResponse();

        response.setNgoOwner(user.getName());
        response.setCreatedAt(user.getCreatedAt());
        response.setVerificationStatus(user.getVerificationStatus());

        Ngo ngo = ngoRepository.findByNgoOwner(user).orElse(null);

        if (ngo != null) {
            response.setNgoName(ngo.getNgoName());
            response.setNgoAddress(ngo.getNgoAddress());
            response.setNgoDescription(ngo.getNgoDescription());
        }

        return response;
    }

    public void updateNgoProfile(User user, NgoProfileRequest request) {
        Ngo ngo = ngoRepository.findByNgoOwner(user).orElseGet(() -> {
            Ngo newNgo = new Ngo();
            newNgo.setNgoOwner(user);
            newNgo.setCreatedAt(LocalDateTime.now());
            return newNgo;
        });

        ngo.setNgoName(request.getNgoName());
        ngo.setNgoAddress(request.getNgoAddress());
        ngo.setNgoDescription(request.getNgoDescription());

        ngoRepository.save(ngo);
    }
}
