<template>
      <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Log Data</h1>
          </div><!-- /.col -->
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Log Data</li>
            </ol>
          </div><!-- /.col -->
        </div><!-- /.row -->
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
                      <i class="far fa-chart-bar"></i>
                      Data Mikroalga
                    </h3>
                  </div>
                  <div class="card-body">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"><i class="fas fa-plus"></i> Tambahkan Kolam</button>

                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama Kolam</th>
                                      <th>Status</th>
                                      <th>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="kolam in kolam.data" :key="kolam.id">
                                      <td>{{kolam.nama_kolam}}</td>
                                      <td v-if="kolam.deleted_at === null">Aktif</td>
                                      <td v-else>Nonaktif</td>
                                      <td><button type="button" class="btn btn-block bg-gradient-success btn-sm" data-toggle="modal" data-target="#modal-edit" @click="getInfoKolam(kolam.id)">Edit</button>
                                      <button type="button" class="btn btn-block bg-gradient-danger btn-sm" v-if="kolam.deleted_at === null" @click="hapusKolam(kolam.id)">Hapus</button>
                                      <button type="button" class="btn btn-block bg-gradient-success btn-sm" v-else>Pulihkan</button>
                                      </td>
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
      <!--Edit Kolam Modal-->
    <div class="modal fade" id="modal-edit">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Informasi Kolam</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Kolam</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="edit.nama_kolam">
                      </div>
                  </div>
                  <input type="hidden" v-model="edit.id">
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="editKolam()" data-dismiss="modal">Simpan</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
        <!--Add Kolam Modal-->
    <div class="modal fade" id="modal-add">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Kolam Baru</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Kolam</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="add.nama_kolam">
                      </div>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="addKolam()" data-dismiss="modal">Simpan</button>
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
  <!-- /.content-wrapper -->
</template>

<script>
import {getHeader, kolamUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          kolam: [],
          edit: [],
          add:{
            nama_kolam: ''
          }
        }
    },

    methods: {
      getKolam: function(){
        var app = this;
        axios.get(kolamUrl, {headers: getHeader()})
        .then(function(response){
          app.kolam=response.data;
          console.log(app.kolam);
        })
      },
      getInfoKolam: function(key){
         var app = this;
          var infoUrl = kolamUrl + '/' + key
        axios.get(infoUrl, {headers: getHeader()})
            .then(function (response) {
            app.edit = response.data.data;
            //console.log(app.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      editKolam: function(){
        const editData = {
              nama_kolam: this.edit.nama_kolam,
          }
          var editUrl = kolamUrl + '/' + this.edit.id
          axios.put(editUrl, editData, {headers: getHeader()})
          this.editsukses();
      },
      addKolam: function(){
        const addData = {
              nama_kolam: this.add.nama_kolam,
          }
          axios.post(kolamUrl, addData, {headers: getHeader()})
          
          this.addsukses();
      },
      hapusKolam: function(key){
        var delUrl = kolamUrl + '/' + key;
        axios.delete(delUrl, {headers: getHeader()})
        this.delsukses();
      },
      addsukses: function() {
          this.$bvToast.toast('Kolam Berhasil Ditambahkan', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
        
      },
      editsukses: function() {
        this.$bvToast.toast('Informasi Kolam Berhasil Diubah', {
          title: 'Notifikasi',
          variant: 'success',
          solid: true
        })
      },
      delsukses: function(){
        this.$bvToast.toast('Informasi Kolam Berhasil Dihapus', {
          title: 'Notifikasi',
          variant: 'danger',
          solid: true
      })
      }
    },
    created(){
      this.getKolam();
    }

    }
</script>

<style>
/*@import "../../assets/plugins/fontawesome-free/css/all.min.css";
  @import "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
  @import "../../assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
  @import ".././assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
  @import "../../assets/plugins/jqvmap/jqvmap.min.css";
  @import "../../assets/dist/css/adminlte.min.css";
  @import "../../assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
  @import "../../assets/plugins/daterangepicker/daterangepicker.css";
  
  @import "../../assets/plugins/summernote/summernote-bs4.css";
  @import "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700";
  @import "../../assets/plugins/bootstrap/js/bootstrap.bundle.min.js";
  @import "../../assets/plugins/chart.js/Chart.min.js";
  @import "../../assets/plugins/sparklines/sparkline.js";
  @import "../../assets/plugins/jqvmap/jquery.vmap.min.js";
  @import "../../assets/plugins/jqvmap/maps/jquery.vmap.usa.js";
  @import "../../assets/plugins/jquery-knob/jquery.knob.min.js";
  @import "../../assets/plugins/moment/moment.min.js";
  @import "../../assets/plugins/daterangepicker/daterangepicker.js";
  @import "../../assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js";
  @import "../../assets/plugins/summernote/summernote-bs4.min.js";
  @import "../../assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js";
  @import "../../assets/dist/js/adminlte.js";
  @import "../../assets/dist/js/pages/dashboard.js";
  @import "../../assets/dist/js/demo.js";*/
</style>