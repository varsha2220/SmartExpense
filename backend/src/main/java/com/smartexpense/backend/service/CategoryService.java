package com.smartexpense.backend.service;

import com.smartexpense.backend.entity.Category;
import com.smartexpense.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderByNameAsc();
    }

    // Get category by ID
    public Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Category Not Found"));
    }

    // Add category
    public Category addCategory(Category category) {

        if (categoryRepository.existsByName(category.getName())) {
            throw new RuntimeException("Category Already Exists");
        }

        return categoryRepository.save(category);
    }

    // Update category
    public Category updateCategory(Long id, Category newCategory) {

        Category category = getCategory(id);

        category.setName(newCategory.getName());

        return categoryRepository.save(category);
    }

    // Delete category
    public void deleteCategory(Long id) {

        Category category = getCategory(id);

        categoryRepository.delete(category);
    }

}
