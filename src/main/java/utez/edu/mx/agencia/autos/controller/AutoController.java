package utez.edu.mx.agencia.autos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.agencia.autos.model.Autos;
import utez.edu.mx.agencia.utils.Message;

@RestController
@RequestMapping("/api/auto")
@CrossOrigin(origins = {"*"})
public class AutoController {
    @Autowired
    AutosService autosService;
    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return autosService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getById(@PathVariable("id") long id){
        return autosService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> saveAuto(@RequestBody AutosDTO autosDTO){
        return autosService.save(new Autos(autosDTO.getName(),autosDTO.getMatricula(),autosDTO.getYearVerification(),autosDTO.getDateCreacion(),autosDTO.getDateUpdate(),autosDTO.getStatus(),autosDTO.getMarca()));
    }

    @PutMapping("/")
    public ResponseEntity<Message> updateAuto(@RequestBody AutosDTO autosDTO){
        return autosService.update(new Autos(autosDTO.getId(),autosDTO.getName(),autosDTO.getMatricula(),autosDTO.getYearVerification(),autosDTO.getDateCreacion(),autosDTO.getDateUpdate(),autosDTO.getStatus(),autosDTO.getMarca()));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Message> deleteById(@PathVariable("id") long id){
        return  autosService.deletebyid(id);
    }

}
