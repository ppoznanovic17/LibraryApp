package com.peca.books.model.dto.discount;

import com.peca.books.model.Book;
import lombok.*;

@NoArgsConstructor@AllArgsConstructor
@Getter@Setter@Data
public class DiscountReqDto {

    private int bookId;
    private int percent;



}
