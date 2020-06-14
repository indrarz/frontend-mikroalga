<template>
      <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">

      </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->
        <div class="row">
          
        </div>
        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
            <div class="col-12">
                <!-- interactive chart -->
                <div class="card card-primary card-outline">
                  <div class="card-header">
                    <h3 class="card-title">
                      <i class="fas fa-th-list"></i>
                       Produksi Mikroalga
                    </h3>
    
                  </div>
                  <div class="card-body">
                      <div class="form-group">
                        <label>Pilih Kolam</label>
                        <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolams in kolams.data" :key="kolams.id" @click="getProduksi(kolams.id)">{{kolams.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                      </div>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"><i class="fas fa-plus"></i> Tambahkan Produksi</button>
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>No. Produksi</th>
                        <th>Spesies Mikroalga</th>
                        <th>Waktu Mulai</th>
                        <th>Waktu Selesai</th>
                        <th>Aksi</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(prod,index) in prod" :key="prod.id">
                        <td>Produksi {{prod.id}}</td>
                        <td>{{namaalga[index]}}</td>
                        <td>{{prod.waktu_mulai}}</td>
                        <td v-if="prod.waktu_selesai === null">-</td>
                        <td v-else>{{prod.waktu_selesai}}</td>
                        <td>tes</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.card-body-->
                </div>
                <!-- /.card -->
    
              </div>
        </div>
        <!-- /.row (main row) -->
      </div><!-- /.container-fluid -->
      <!--Add Produksi Modal-->
    <div class="modal fade" id="modal-add">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Produksi Baru</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Pilih Kolam</label>
                      <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="kolams in kolams.data" :key="kolams.id" @click="selectKolam(kolams.id)">{{kolams.nama_kolam}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                  </div>
                  <div class="form-group">
                    <label>Pilih Spesies</label>
                    <select class="form-control">
                          <option value="" disabled selected>Silakan Pilih</option>
                          <option v-for="algas in algas.data" :key="algas.id" @click="selectAlga(algas.id)">{{algas.nama_spesies}}</option>
                          <!--<option value="3  ">Operator</option>-->
                        </select>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addProduksi()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
    </section>
    <!-- /.content -->
  </div>
</template>

<script>
import {getHeader, kolamUrl, mikroalgaUrl, produksiUrl} from '../../config'
import axios from 'axios'
export default {
    data: function(){
        return{
            kolams: [],
            prod: [],
            //namakolam: [],
            namaalga: [],
            algas: [],
            selectedKolam: '',
            selectedAlga: ''
        }
    },

    methods: {
        getKolam: function(){
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolams=response.data;
          //console.log(app.kolam)
        })
      },
      getMikroalga: function() {

        var app = this;

         axios.get(mikroalgaUrl, {headers: getHeader()})
            .then(function (response) {
            app.algas = response.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });

      },

      getProduksi: function(key){
        var app = this;
        var prodUrl = kolamUrl + '/' + key + '/produksi';
        axios.get(prodUrl, {headers: getHeader()})
        .then(function(response){
          app.prod=response.data.data;
          //app.isHidden=false;
          //console.log(app.prod[0].waktu_mulai)
          var temp = []
          for (let index = 0; index < app.prod.length; index++) {
              //var kolamini = kolamUrl + '/' + app.prod[index].id_kolam
              var algaini = mikroalgaUrl + '/' + app.prod[index].id_mikroalga
              /*axios.get(kolamini, {headers: getHeader()})
              .then(function(response){
                app.namakolam.push(response.data.data.nama_kolam)
              })*/
              axios.get(algaini, {headers: getHeader()})
              .then(function(response){
                temp.push(response.data.data.nama_spesies)
                app.namaalga = temp
              })
          }
          //console.log(app.namakolam)
          //console.log(app.namaalga)
        })
      },
      selectKolam: function(key){
        this.selectedKolam = key
      },
      selectAlga: function(key){
        this.selectedAlga = key
      },
      addProduksi: function(){
        const addData ={
          id_kolam : this.selectedKolam,
          id_mikroalga : this.selectedAlga
        }
        axios.post(produksiUrl, addData, {headers: getHeader()})
        .then(function(response){
          console.log(response)
        })
      }
    },

    created(){
        this.getKolam();
        this.getMikroalga();
    }
}
</script>