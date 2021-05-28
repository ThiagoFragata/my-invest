package br.com.thiagofragata.myinvest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.thiagofragata.myinvest.domain.Investimento;

public interface InvestimentoRepository extends JpaRepository<Investimento, Long>{

}
