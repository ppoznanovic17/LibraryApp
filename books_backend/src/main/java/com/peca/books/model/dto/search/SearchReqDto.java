package com.peca.books.model.dto.search;

import java.util.List;

public class SearchReqDto {

    private int minPrice;
    private int maxPrice;
    private List<String> format;
    private List<String> category;
    private List<String> language;
    private int offset;
    private int limit;
    private String sort;
    private int order;


    public SearchReqDto() {
    }

    @Override
    public String toString() {
        return "SearchDto{" +
                "minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                ", format=" + format +
                ", category=" + category +
                ", language=" + language +
                ", off=" + offset +
                ", limit=" + limit +
                ", sort='" + sort + '\'' +
                ", order=" + order +
                '}';
    }

    public int getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(int minPrice) {
        this.minPrice = minPrice;
    }

    public boolean isEmpty() {
        if(minPrice <= 0 &&
            maxPrice >= 10000 &&
                (format == null || format.size()==0) &&
                (category == null || category.size()==0) &&
                (language == null || language.size() == 0)){
            return true;
        }
        return false;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public int getOrder() {
        return order;
    }

    public void setOrder(int order) {
        this.order = order;
    }

    public int getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(int maxPrice) {
        this.maxPrice = maxPrice;
    }

    public List<String> getFormat() {
        return format;
    }

    public void setFormat(List<String> format) {
        this.format = format;
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public List<String> getLanguage() {
        return language;
    }

    public void setLanguage(List<String> language) {
        this.language = language;
    }
}
