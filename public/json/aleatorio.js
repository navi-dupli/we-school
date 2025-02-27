   idCurso:String,
    idDocente: String,
    nombreMateria: String,
    fechaInicio: String,
    estado: String,
    descripcion: String,



    <div class="wrapper">
    <div class="sidebar" data-color="grey">    
        <div class="sidebar-wrapper">
            <div class="logo">
                <a class="logo_busque" href="#" class="simple-text">
                    <img src="assets/dashboard/img/lobusque.jpg" alt="lobusque">
                </a>
            </div>
                       
            <ul class="nav">
                <li class="active">
                    <a href="/dashboard">
                        <i class="pe-7s-graph"></i> 
                        <p>Inicio</p>
                    </a>            
                </li>
                <li>
                    <a href="user.html">
                        <i class="pe-7s-user"></i> 
                        <p>Perfil</p>
                    </a>
                </li> 
                <li>
                    <a href="/objects">
                        <i class="pe-7s-note2"></i> 
                        <p>Mis Objetos</p>
                    </a>        
                </li>
                <li>
                    <a href="notifications.html">
                        <i class="pe-7s-bell"></i> 
                        <p>Notifications</p>
                    </a>        
                </li>
            </ul> 
        </div>
    </div>
    
    <div class="main-panel">
        <nav class="navbar navbar-default navbar-fixed">
            <div class="container-fluid">    
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Inicio</a>
                </div>
                <div class="collapse navbar-collapse">       
                    <ul class="nav navbar-nav navbar-left">
                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <i class="fa fa-dashboard"></i>
                            </a>
                        </li>
                        <li class="dropdown">
                              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                    <i class="fa fa-globe"></i>
                                    <b class="caret"></b>
                                    <span class="notification">5</span>
                              </a>
                              <ul class="dropdown-menu">
                                <li><a href="#">Notification 1</a></li>
                                <li><a href="#">Notification 2</a></li>
                                <li><a href="#">Notification 3</a></li>
                                <li><a href="#">Notification 4</a></li>
                                <li><a href="#">Another notification</a></li>
                              </ul>
                        </li>
                    </ul>
                    
                    <ul class="nav navbar-nav navbar-right">
                         <li id="photoAvatar">
                            <a href="#">
                                <img id="avatar" src="<%= user.google.photo %>" alt="..."/>
                                 <%= user.google.name %>
                            </a>
                        </li> 

                         <li>
                            <a href="/logout">
                                Cerrar sesion
                            </a>
                        </li> 
                    </ul>
                </div>
            </div>
        </nav>
               





               </aside>                     
            <div class="content">
                <div class="container-fluid">
                    <div class="row">                   
                        <div class="col-md-12">
                            <div class="card">
                                <div class="header add-object">
                                    <h4 class="title">Sus Objetos</h4>
                                    <p class="category objects"> A continuacion se listan sus objetos</p>
                                </div>
                                  <div class="row add-object">
                                    <div class="col-md-2 col-md-offset-1">
                                        <button id="add-car" class=s>Agregar <i class="fa fa-plus-circle"></i></button>
                                    </div>
                                  </div>
                                <div class=" table-car content table-responsive table-full-width" >
                                    <table class="table table-hover table-striped">
                                        <thead>
                                            <th></th>
                                            <th class="text-align">Marca</th>
                                            <th class="text-align">Precio</th>
                                            <th class="text-align">Ciudad</th>
                                            <th class="text-align">Año</th>
                                            <th class="text-align">Favoritos</th>
                                            <th class="text-align">Eliminar</th>
                                        </thead>
                                        <tbody >
                                            <% if (object) { %>
                                            <% object.forEach(function(obj) { %>                 
                                            <tr class="<%= obj._id %>" style="text-align:center;">
                                                <td><img id="avatar2" src="/fotos/<%= user.id%>/<%=obj._id%>/frente.jpg" alt=""></td> 
                                                <td><%= obj.brand %> </td>
                                                <td><%= obj.price %><id="avatar" /td>
                                                <td><%= obj.city %></td>
                                                <td><%= obj.year %></td>
                                                <td><favorite-star active class="star"></favorite-star></td>
                                                <td>
                                                    <button id="<%= obj._id %>" class="btnCarRemove btn btn-primary btn-block ">Eliminar <i class="fa fa-trash"></i>
                                                    </button>
                                                    <input type="hidden" value="<%= obj._id %>">
                                                </td>


                                            </tr>
                                             <% }); %>
                                           <%} else {%>
                                                <td colspan="" rowspan="" headers="">Para crear el objeto de click en el boton <span class="fa fa-plus-circle"></span></td>
                                            <% } %>
                                        </tbody>
                                    </table>
                                </div>
                                
                                   
                                   
                                    <form class=" card form-car " enctype="multipart/form-data" style="display:none;" action="objects" method="POST" >
                                    <div id="section-1" class="card col-md-12"  style="display:none;">
                                        <div>
                                            <label for=""><h2>Ingrese su nuevo objeto</h2></label>
                                        </div>
                                        <section class="col-md-6 ">
                                           
                                            <div class="form-group" id="car-list" >
                                                <label for="bio">Marca:</label><br>
                                                <select class="form-control" name="brand" id="career-list">
                                                </select>
                                            </div>
                                            <div class="form-group" id="modelo">
                                                <label for="bio">Modelo:</label><br>
                                                <input class="form-control" type="text" name="model" value="" placeholder="corola">
                                           </div>
                                            <div class="form-group" id="Cilindrada">
                                                <label for="bio">Cilindrada:</label><br>
                                                <input class="form-control" type="text" name="cyl" value="" placeholder="cc">
                                            </div>
                                            <div class="form-group" id="style-cars">
                                                <label for="bio">Estilo:</label><br>
                                                <select class="form-control" name="styleCar" id="style-car">
                                                </select>
                                            </div>
                                            <div class="form-group" id="ano-cars">
                                                <label for="bio">Año:</label><br>
                                                <select class="form-control" name="year" id="ano-car">
                                                </select>
                                            </div>
                                            <div class="form-group" id="price">
                                                <label for="bio">Precio (¢):</label><br>
                                                <input class="form-control" type="text" name="price" value="" placeholder="colones">
                                           </div>
                                        
                                        
                                           <div class="form-group" id="price-negotiables">
                                            <label for="bio">Precio Negociable:</label><br>
                                            <select class="form-control" name="priceNegotiable" id="price-negotiable">
                                                <option value="Si">Si</option>
                                                <option value="No">No</option>
                                            </select>
                                            </div>
                                        </section>
                                        <section class="col-md-6">
                                            <div class="form-group" >
                                                <label for="bio">Color Exterior:</label><br>
                                                <input id="color-front" class="form-control" type="text" name="colorFront" value="" placeholder="color">
                                           </div>                               
                                            <div class="form-group" >
                                                <label for="bio">Color Interior:</label><br>
                                                <input id="color-back" class="form-control" type="text" name="colorBack" value="" placeholder="color">
                                           </div>
                                            <div class="form-group" id="fuel-cars">
                                                <label for="bio">Combustible:</label><br>
                                                <select class="form-control" name="fuelCar" id="fuel-car">
                                                    <option value="Gasolina">Gasolina</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Hibrido">Hibrido</option>
                                                    <option value="Electrico">Electrico</option>
                                                </select>
                                           </div>
                                            <div class="form-group" id="transmission-cars">
                                                <label for="bio">Transmisión:</label><br>
                                                <select class="form-control" name="transmissionCar" id="transmission-car">
                                                    <option value="Automatica">Automatica</option>
                                                    <option value="Manual">Manual</option>
                                                </select>
                                           </div>
                                            <div class="form-group" id="km-car">
                                                <label for="bio">Kilometraje:</label><br>
                                                <input class="form-control" type="text" name="kmCar" value="" placeholder="12000">
                                           </div>
                                            <div class="form-group" id="document-car">
                                              <label for="bio">Está inscrito ya pagó impuestos?):</label><br>
                                                <select class="form-control" name="documentCar" id="transmission-car">
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>
                                                </select>
                                           </div>
                                           <div class="form-group" id="door-cars">
                                                <label for="bio">Puertas:</label><br>
                                                <select class="form-control" name="doorCar" id="door-car">
                                                </select>
                                           </div>
                                            <div class="form-group" id="province">
                                                <label for="bio">Combustible:</label><br>
                                                <select class="form-control" name="province" id="province-car">
                                                    <option value="Alajuela">Alajuela</option>
                                                    <option value="Cartago">Cartago</option>
                                                    <option value="Guanacaste">Guanacaste</option>
                                                    <option value="Heredia">Heredia</option>
                                                    <option value="Limón">Limón</option>
                                                    <option value="San José">San José</option>
                                                </select>
                                           </div>
                                        </section>
                                        <input id="form-date" class="form-control btn btn-default" value ="cargar fotos">
                                    </div>
                                    <div id="form-car2" style="display:none;">
                                   <section  class="col-md-12 card" >
                                        <div class="form-group">
                                           <label for="foto_1">Adjuntar una foto</label>
                                            <input type="file" name="photos">
                                            <p class="help-block">Carro.png</p>
                                        </div>
                                        <div class="form-group">
                                           <label for="foto_2">Adjuntar una foto</label>
                                            <input type="file" name="photos">
                                            <p class="help-block">pefil-derecho.png</p>
                                        </div>
                                        <div class="form-group">
                                           <label for="foto_3">Adjuntar una foto</label>
                                            <input type="file" name="photos">
                                            <p class="help-block">pefil-inzquierdo.png</p>
                                        </div> 
                                        <INPUT class="form-control btn btn-default" type="submit" value="guardar">
                                    </section>
                                    </div>
                                  
                                </form>
                                
                            </div>
                        </div>  
                               
                                     
                    </div>                    
                </div>
            </div>                     

            
            
            <footer class="footer">
                <div class="container-fluid">

                    <p class="copyright pull-right">
                        &copy; 2015 
                    </p>
                </div>
            </footer>
            
        </div>   
    </div>


    </body>

        <!--   Core JS Files   -->
        <script src="assets/dashboard/js/jquery-1.10.2.js" type="text/javascript"></script>
        <script src="assets/dashboard/js/bootstrap.min.js" type="text/javascript"></script>
        
        <!--  Checkbox, Radio & Switch Plugins -->
        <script src="assets/dashboard/js/bootstrap-checkbox-radio-switch.js"></script>
        
        <!--  Charts Plugin -->
        <script src="assets/dashboard/js/chartist.min.js"></script>

        <!--  Notifications Plugin    -->
        <script src="assets/dashboard/js/bootstrap-notify.js"></script>
        
        <!--  Google Maps Plugin    -->
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
        
        <!-- Light Bootstrap Table Core javascript and methods for Demo purpose -->
        <script src="assets/dashboard/js/light-bootstrap-dashboard.js"></script>
        
        <!-- Light Bootstrap Table DEMO methods, don't include it in your project! -->
        <script src="assets/dashboard/js/demo.js"></script>

        <!-- Script main-->
        <script src="json/main.js" type="text/javascript" charset="utf-8" async defer></script>
        <script type="text/javascript" src="json/jquery.autocomplete.js"></script>

        
    </html>





    <span class="btn btn-primary"><i class="fa fa-cogs fa-4x"></i> Ajustes</span>