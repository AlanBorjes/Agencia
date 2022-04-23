package utez.edu.mx.agencia.marca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.agencia.marca.model.Marca;
import utez.edu.mx.agencia.utils.Message;

@RestController
@RequestMapping("/api/marca")
@CrossOrigin(origins = {"*"})
public class MarcaController {
    @Autowired
    MarcaService marcaService;

    @GetMapping("/")
    public ResponseEntity<Message> getAll(){
        return marcaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getById(@PathVariable("id") long id){
        return marcaService.findById(id);
    }

    @PostMapping("/")
    public ResponseEntity<Message> saveMarca(@RequestBody MarcaDTO marcaDTO){
        return marcaService.save(new Marca(marcaDTO.getName()));
    }

    @PutMapping("/")
    public ResponseEntity<Message> updateMarca(@RequestBody MarcaDTO marcaDTO){
        return marcaService.update(new Marca(marcaDTO.getId(), marcaDTO.getName()));
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity<Message> deleteById(@PathVariable("id") long id){
        return  marcaService.deletebyid(id);
    }

}