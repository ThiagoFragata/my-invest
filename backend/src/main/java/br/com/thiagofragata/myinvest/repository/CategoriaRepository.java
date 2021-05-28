package br.com.thiagofragata.myinvest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.thiagofragata.myinvest.domain.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
	
}
