package com.peca.books.service.impl;

import com.peca.books.dao.BookDao;
import com.peca.books.model.Book;
import com.peca.books.model.dto.cart.CartReqDto;
import com.peca.books.model.dto.discount.DiscountReqDto;
import com.peca.books.model.dto.search.SearchReqDto;
import com.peca.books.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    BookDao bookDao;

    @Override
    public List<Book> findAll() {
        List<Book> bookList = bookDao.findAll();

        List<Book> activeBookList = new ArrayList<>();

        for( Book b : bookList){
            if(b instanceof Book){
                if( b.isActive()){
                    activeBookList.add(b);
                }
            }
        }
        return activeBookList;
    }

    @Override
    public List<Book> findTopSold() {
        List<Book> bookList = bookDao.findAllByOrderByNumberOfSoldDesc();
        return bookList.subList(0,6);

    }

    @Override
    public List<Book> findAllPopularity() {
        return bookDao.findAllByOrderByNumberOfSoldDesc();
    }

    @Override
    public List<Book> findAllByPriceDesc() {
        return bookDao.findAllByOrderByOurPriceDesc();
    }

    @Override
    public List<Book> findAllByPrice() {
        return bookDao.findAllByOrderByOurPrice();
    }

    @Override
    public List<Book> findAllNumOfPagesDesc() {
        return bookDao.findAllByOrderByNumberOfPagesDesc();
    }

    @Override
    public List<Book> findAllNumOfPages() {
        return bookDao.findAllByOrderByNumberOfPages();
    }

    @Override
    public List<Book> findAllTitleDesc() {
        return bookDao.findAllByOrderByTitleDesc();
    }

    @Override
    public List<Book> findAllTitle() {
        return bookDao.findAllByOrderByTitle();
    }

    @Override
    public List<Book> findBetweenPrice(double ourPrice, double ourPrice2, String category, String format, String language) {
        return bookDao.findAllByOurPriceIsBetweenAndCategoryAndFormatAndLanguageOrderByOurPriceDesc
                (ourPrice, ourPrice2, category, format, language);
    }

    @Override
    public List<Book> pagination(int offset, int limit, String sort, int order, SearchReqDto searchDto) {

        List<Book> books;
        System.out.println("off: " + offset + "| limit: " + limit + "| sort: "  + sort + "| order: " + order);
        System.out.println(searchDto);


        if(sort.equals("price")){
            if(order == 1){
                books = bookDao.findAllByOrderByOurPrice();
            }else {
                books = bookDao.findAllByOrderByOurPriceDesc();
            }


        }else if(sort.equals("page")){
            if(order == 1){
                books = bookDao.findAllByOrderByNumberOfPages();
            }else {
                books = bookDao.findAllByOrderByNumberOfPagesDesc();
            }

        }else if(sort.equals("title")){
            if(order == 1){
                books = bookDao.findAllByOrderByTitle();
            }else {
                books = bookDao.findAllByOrderByTitleDesc();
            }

        }else{
            books = bookDao.findAllByOrderByNumberOfSoldDesc();
        }

        if(books.size() == 0){
            return null;
        }

        if(searchDto.isEmpty()){
            int first = (offset-1) * limit;
            int last = offset*limit;
            int size = books.size();

            if(books.size() == 0){
                return null;
            }

            if(limit*offset >= size){
                last = size;
            }

            if(first >= size){
                return null;
            }
            return books.subList(first, last);
        }



        List<Book> iterationBooks= new ArrayList<>();
        iterationBooks.addAll(books);
        for(Book b: iterationBooks){

            if(searchDto.getMinPrice() != 0){
                if(searchDto.getMinPrice() > b.getOurPrice()){
                    books.remove(b);
                }
            }

            if(searchDto.getMaxPrice() < 10000){
                if(searchDto.getMaxPrice() <= b.getOurPrice()){
                    books.remove(b);
                }
            }




            if(!(searchDto.getFormat() == null || searchDto.getFormat().size()==0)){
                boolean format = false;
                for(String s: searchDto.getFormat()){
                    if(s.toLowerCase().trim().contains(b.getFormat().toLowerCase().trim())){
                        format = true;
                    }
                }
                if(!format) books.remove(b);
            }


            if(!(searchDto.getCategory() == null || searchDto.getCategory().size()==0)) {
                boolean category = false;
                for (String s : searchDto.getCategory()) {
                    if (s.toLowerCase().trim().contains(b.getCategory().toLowerCase().trim())) {
                        category = true;
                    }
                }
                if (!category) books.remove(b);
            }

            if(!(searchDto.getLanguage() == null || searchDto.getLanguage().size()==0)) {
                boolean language = false;
                for (String s : searchDto.getLanguage()) {
                    if (s.toLowerCase().trim().contains(b.getLanguage().toLowerCase().trim())) {
                        language = true;
                    }
                }
                if (!language) books.remove(b);
            }
        }
        int first = (offset-1) * limit;
        int last = offset*limit;
        int size = books.size();

        if(books.size() == 0){
            return null;
        }

        if(limit*offset >= size){
            last = size;
        }

        if(first >= size){
            return null;
        }
        int iter = 0;
        for(Book book: books) {
            iter++;
            System.out.println(iter + ". " + book.getTitle());
        }
        System.out.println(first + "   " + last);
        return books.subList(first, last);
    }

    @Override
    public int numberOfBooks(SearchReqDto searchDto) {
        return pagination(1,1000, "", 1, searchDto).size();

    }


    @Override
    public void sellBook(CartReqDto cart) {
        for (int i = 0; i < cart.getId().size(); i++) {
            String[] idSplitter =  cart.getId().get(i).split("-");
            String idString = idSplitter[1];
            long id = Long.parseLong(idString);
            Optional<Book> bookOptional = bookDao.findById(id);
            if(bookOptional.isEmpty()){
                return;
            }
            Book b = bookOptional.get();
            b.setNumberOfSold(b.getNumberOfSold() + Integer.parseInt(cart.getNumber().get(i)));
            b.setInStockNumber(b.getInStockNumber() - Integer.parseInt(cart.getNumber().get(i)));
            bookDao.save(b);
        }


    }

    @Override
    public void setDiscount(DiscountReqDto discount) {
        Optional<Book> bookOptional = bookDao.findById(discount.getBookId());
        if(bookOptional.isEmpty()){
            return;
        }
        Book b = bookOptional.get();
        b.setNewPrice(b.getOurPrice() * ((100 - discount.getPercent() * 1.0)/100));
        b.setDiscount(discount.getPercent());

        System.out.println(b.getNewPrice() + "     " + b.getDiscount() + "     "  + b.getOurPrice());
        bookDao.save(b);
    }

    @Override
    public List<Book> allSorted(String sort, int order) {
        if(sort.equals("price")){
            if(order == 1){
                return bookDao.findAllByOrderByOurPrice()   ;
            }else {
                return bookDao.findAllByOrderByOurPriceDesc();
            }


        }else if(sort.equals("page")){
            if(order == 1){
                return bookDao.findAllByOrderByNumberOfPages();
            }else {
                return bookDao.findAllByOrderByNumberOfPagesDesc();
            }

        }else if(sort.equals("title")){
            if(order == 1){
                return bookDao.findAllByOrderByTitle();
            }else {
                return bookDao.findAllByOrderByTitleDesc();
            }

        }else{
            return bookDao.findAllByOrderByNumberOfSoldDesc();
        }

    }

    @Override
    public Book findOne(Long id) {
        return bookDao.getOne(id);
    }

    @Override
    public Book save(Book book) {
        return bookDao.save(book);
    }

    @Override
    public List<Book> blurrySearch(String str) {
        List<Book> bookList = bookDao.findByTitleContainingOrAuthorContaining(str, str);

        List<Book> activeBookList = new ArrayList<>();

        for( Book b : bookList){
            if(b instanceof Book){
                if( b.isActive()){
                    activeBookList.add(b);
                }
            }
        }
        return activeBookList;
    }

    @Override
    public List<Book> fullSearch(String str) {
        return null;
    }

    @Override
    public void removeOne(Long id) {
            bookDao.deleteById(id);
    }
}
