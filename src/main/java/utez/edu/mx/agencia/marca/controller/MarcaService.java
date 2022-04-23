package utez.edu.mx.agencia.marca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.agencia.marca.model.Marca;
import utez.edu.mx.agencia.marca.model.MarcaRepository;
import utez.edu.mx.agencia.utils.Message;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class MarcaService {
    @Autowired
    MarcaRepository marcaRepository;


    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("Ok", false, marcaRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        if(marcaRepository.existsById(id)){
            return new ResponseEntity<>(new Message("Ok", false, marcaRepository.findById(id)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("la marca no existe", true, null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Marca marca){
        Optional<Marca> existMarca= marcaRepository.findByName(marca.getName());
        if(existMarca.isPresent()){
            return new ResponseEntity<>(new Message("el marca ya existe", true, null), HttpStatus.BAD_REQUEST);
        }
        Marca savedMarca= marcaRepository.saveAndFlush(marca);
        return new ResponseEntity<>(new Message("marca registrado correctamente", false, savedMarca), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update(Marca marca){
        if(marcaRepository.existsById((marca.getId()))){
            return new ResponseEntity<>(new Message("Ok", false, marcaRepository.saveAndFlush(marca)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El marca no existe", true, null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> deletebyid(long id){
        if( marcaRepository.existsById(id)){
            System.out.println(id);
            marcaRepository.deleteById(id);
            return new ResponseEntity<>(new Message("marca eliminado", false,null), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El marca no existe", true, null), HttpStatus.BAD_REQUEST);
    }
}

