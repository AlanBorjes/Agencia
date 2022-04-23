package utez.edu.mx.agencia.autos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.agencia.autos.model.Autos;
import utez.edu.mx.agencia.autos.model.AutosRepository;
import utez.edu.mx.agencia.utils.Message;


import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class AutosService {
    @Autowired
    AutosRepository autosRepository;

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findAll(){
        return new ResponseEntity<>(new Message("Ok", false, autosRepository.findAll()), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<Message> findById(long id){
        if(autosRepository.existsById(id)){
            return new ResponseEntity<>(new Message("Ok", false, autosRepository.findById(id)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El autos no existe", true, null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> save(Autos autos){
        Optional<Autos> existAutos= autosRepository.findByMatricula(autos.getMatricula());
        if(existAutos.isPresent()){
            return new ResponseEntity<>(new Message("el autos ya existe", true, null), HttpStatus.BAD_REQUEST);
        }
        Autos savedAutos= autosRepository.saveAndFlush(autos);
        return new ResponseEntity<>(new Message("autos registrado correctamente", false, savedAutos), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> update(Autos autos){
        if(autosRepository.existsById((autos.getId()))){
            return new ResponseEntity<>(new Message("Ok", false, autosRepository.saveAndFlush(autos)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El autos no existe", true, null), HttpStatus.BAD_REQUEST);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<Message> deletebyid(long id){
        if( autosRepository.existsById(id)){
            System.out.println(id);
            autosRepository.deleteById(id);
            return new ResponseEntity<>(new Message("autos eliminado", false,null), HttpStatus.OK);
        }
        return new ResponseEntity<>(new Message("El autos no existe", true, null), HttpStatus.BAD_REQUEST);
    }
}
