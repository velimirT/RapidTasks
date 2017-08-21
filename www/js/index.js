/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$user = false;
$host = 'http://ogicom.bg/scores/notes/func.php';
db = null;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
			try{
			db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
			
			db.transaction(function (tx) {
				tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name ='users'", [], function (tx, result) {
					if (result.rows.length == 0) {
						//show login screen
						showLoginScreen();
						//create table users, to be filled by the login function
						db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
						db.transaction(function(tx) {
							tx.executeSql('CREATE TABLE IF NOT EXISTS users (id, name, pass, avatar, position, email, verified)');
						}, error, success);
					} else {
						//login(results.item(0).rows['name'], results.item(0).rows['password']);
					}
				});
			}
			}catch(e){
				alert(e.toString();
			}
		function showLoginScreen($err){
			if($err !== undefined){
				$("#loginScreen .err").html($err).show();
			}
			$("#loginScreen").fadeIn();
		}
		
		$(document).on('click', '#loginScreen button', function(){
			alert('clicked');
			login($("#loginScreen .name").val(), $("#loginScreen .pass").val());
		});
		
		function error(error){
			alert('err'+error.message);
		}
		
		function success(){
			console.log('Populated database OK');
		}
		
		function login(user, pass){
			alert("in login");
			try{
			$.post($host, {'act':'login', 'user':user, 'pass':pass}, function(data){ 
				data = JSON.parse(data);
				if(data.logged == 'true'){
					$user = user;;
					$("#loginScreen").fadeOut();
					db.transaction(function(tx) {
						tx.executeSql('INSERT INTO users VALUES (?,?,?,?,?,?,?)', [1, user, pass, data.avatar, data.position, data.email, data.verified]);
					}, error, success);
					alert("logged");
				}else{
					var $err = data.err;
					showLoginScreen($err);
					//login screen show, error msg show
				}
			});
			
			}catch(e){
				alert(e.toString();
			}
		}//login		
    }
};
