package com.peca.books.service.impl;

import com.peca.books.dao.UserDao;
import com.peca.books.domain.User;
import com.peca.books.domain.dto.UserReqDto;
import com.peca.books.domain.dto.UserResDto;
import com.peca.books.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;

    @Override
    public UserResDto findByUsernameRes(String username)  {
        User user;

        try {
             user = userDao.findByUsername(username).get();
            UserResDto rtn = new UserResDto(user);
            return rtn;
        }catch (Exception e){

            System.out.println("Jeste NULL RES");
            UserResDto resDto = new UserResDto("fail");
            return resDto;
        }






    }

    @Override
    public UserReqDto findByUsernameReq(String username) {

        User user;
        try {
             user = userDao.findByUsername(username).get();
            //System.out.println("NIJE BIO NULL");
            UserReqDto rtn = new UserReqDto(user);

            return rtn;
        }catch (Exception e){
            //System.out.println("BIO NULL");
            UserReqDto reqDto = new UserReqDto("error");
            reqDto.setPassword("fail");
            return reqDto;
        }





    }

    @Override
    @Transactional
    public UserResDto save(User userReq)  {







           userDao.save(userReq);
           return new UserResDto(userReq);




    }

    @Override
    public User findById(Long id) {
        Optional<User> o = userDao.findById(id);
        User user;
        try {
            user = o.get();
        }catch (Exception e){
            user = null;
        }

        return user;
    }

    @Override
    public Optional<User> findByEmail(String username) {
        return userDao.findByEmail(username);
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userDao.findByUsername(username);
    }
}
