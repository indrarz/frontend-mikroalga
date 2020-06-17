<template>
      <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
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
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modal-add"><i class="fas fa-plus"></i> Tambahkan Mikroalga</button>

                              <table id="example2" class="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                      <th>Nama Spesies</th>
                                      <th>Suhu Air Optimal</th>
                                      <th>pH Optimal</th>
                                      <th>Intensitas Cahaya Optimal</th>
                                      <th>Aksi</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="mikroalga in mikroalga.data" :key="mikroalga.id">
                                      <td>{{mikroalga.nama_spesies}}</td>
                                      <td>{{mikroalga.suhu_air_optimal}}</td>
                                      <td>{{mikroalga.ph_optimal}}</td>
                                      <td>{{mikroalga.intensitas_cahaya_optimal}}</td>
                                      <td><button type="button" class="btn btn-block bg-gradient-success btn-sm" data-toggle="modal" data-target="#modal-edit" @click="getAlga(mikroalga.id)">Edit</button>
                                      <button type="button" class="btn btn-block bg-gradient-danger btn-sm" v-if="mikroalga.deleted_at === null" @click="delAlga(mikroalga.id)">Hapus</button>
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
      <!--Edit Mikroalga Modal-->
    <div class="modal fade" id="modal-edit">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Informasi Mikroalga</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="PUT">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Spesies</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="data.nama_spesies">
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Suhu Air Optimal</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control"  v-model="data.suhu_air_optimal">
                      </div>
                  </div>
                  <div class="form-group">
                      <label>pH Optimal</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control"  v-model="data.ph_optimal">
                      </div>
                  </div>
                  <input type='hidden' v-model="data.id">
                  <div class="form-group">
                      <label>Intensitas Cahaya Optimal</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control"  v-model="data.intensitas_cahaya_optimal">
                      </div>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="editAlga()" data-dismiss="modal">Save changes</button>
            </div>
            </form>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>
          <div class="modal fade" id="modal-add">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Tambahkan Informasi Mikroalga</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form class="form" method="POST">
            <div class="modal-body">
              
                  <div class="form-group">
                      <label>Nama Spesies</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" v-model="add.nama_spesies">
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Suhu Air Optimal</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control"  v-model="add.suhu_air_optimal">
                      </div>
                  </div>
                  <div class="form-group">
                      <label>pH Optimal</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control"  v-model="add.ph_optimal">
                      </div>
                  </div>
                  <div class="form-group">
                      <label>Intensitas Cahaya Optimal</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control"  v-model="add.intensitas_cahaya_optimal">
                      </div>
                  </div>
              
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary" @click="addAlga()" data-dismiss="modal">Simpan</button>
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
import {getHeader, mikroalgaUrl} from '../../config'
import axios from 'axios'
export default {

    data: function () {
        return {
          mikroalga: [],
          data: [],
          add: {
            nama_spesies: '',
              suhu_air_optimal: '',
              ph_optimal: '',
              intensitas_cahaya_optimal: ''
          }
        }
    },

    methods: {

      getMikroalga: function() {

        var app = this;

         axios.get(mikroalgaUrl, {headers: getHeader()})
            .then(function (response) {
            app.mikroalga = response.data;
            //console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });

      },

      getAlga: function(key) {
          var app = this;
          var algaUrl = mikroalgaUrl + '/' + key
        axios.get(algaUrl, {headers: getHeader()})
            .then(function (response) {
            app.data = response.data.data;
            this.getMikroalga();
            //console.log(app.data);
        })
        .catch(function (error) {
            console.log(error.message);
        });
      },
      editAlga: function(){
          const editData = {
              nama_spesies: this.data.nama_spesies,
              suhu_air_optimal: this.data.suhu_air_optimal,
              ph_optimal: this.data.ph_optimal,
              intensitas_cahaya_optimal: this.data.intensitas_cahaya_optimal
          }
          var editUrl = mikroalgaUrl + '/' + this.data.id
          axios.put(editUrl, editData, {headers: getHeader()})
          this.getMikroalga();
      },
      addAlga: function(){
        const addData = {
              nama_spesies: this.add.nama_spesies,
              suhu_air_optimal: this.add.suhu_air_optimal,
              ph_optimal: this.add.ph_optimal,
              intensitas_cahaya_optimal: this.add.intensitas_cahaya_optimal
          }
          axios.post(mikroalgaUrl, addData, {headers: getHeader()})
          this.getMikroalga();
      },
      delAlga: function(key){
        var delUrl = mikroalgaUrl + '/' + key;
        axios.delete(delUrl, {headers: getHeader()})
        .then(response =>{
          console.log(response);
        })
      }

    },

    created() {
      this.getMikroalga();
      
    }

    }
</script>