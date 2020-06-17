package com.peca.books.ctrl;

import com.peca.books.model.Rating;
import com.peca.books.model.dto.rating.RatingResDto;
import com.peca.books.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(path = "/rate")
public class RatingCtrl {

    @Autowired
    private RatingService service;

    public RatingCtrl() {

    }


    @GetMapping(path = "/user/{id}")
    public List<RatingResDto> getByUserId(@PathVariable long id){
        return service.findAllByUserId(id);
    }

    @GetMapping(path = "/book/{id}")
    public List<RatingResDto> getByBookId(@PathVariable long id){
        return service.findAllByBookId(id);
    }

    @PostMapping(path = "/new")
    public RatingResDto newRating(@RequestBody Rating r){
        return service.save(r);
    }

    @DeleteMapping(path = "/delete/{id}")
    public void deleteRating(@PathVariable long id) {
        service.delete(id);
    }

    @GetMapping(path = "/myrate/{bookId}&{userId}")
    public boolean isUsersRate(@PathVariable long bookId, @PathVariable long userId){
        return service.isUsersRating(userId, bookId);
    }

    @GetMapping(path = "/isUserRate/{userId}&{bookId}")
    public boolean isUserRateBook (@PathVariable long userId, @PathVariable long bookId){
        return service.userRatedBook(userId, bookId);
    }

}
