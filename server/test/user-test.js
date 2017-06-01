var chai = require('chai');
var assert = require('assert');
var request = require('supertest');
var express = require('express');

chai.should();

//For users
var User = require('../../model/users');

var sampleInput = {
    username: String, 
    password: String, 
    firstName: String, 
    middleName: String, 
    lastName: String,
    
    ptrNumber: Number,
    licenseNumber: Number,
    contactNumber: Number,

    timeSlots: String,
    civilStatus: String,
    occupation: String,

    age: Number,
    sex: String,

    birthDate: Date,
    referredBy: String,

    dateRegistered: Date
}

trinketAge = 21;


describe('User API responses', function() {
    var url = 'http://localhost:3001';
   
    //Credentials checker
    //Username
    it('Username should be a String', function(done){
        sampleInput.username.should.be.equal(String);
        done();
    })

    //Password
    it('Password should be a String', function(done){
        sampleInput.password.should.be.equal(String);
        done();
    })

    //firstName
    it('First name should be a String', function(done){
        sampleInput.firstName.should.be.equal(String);
        done();
    })

    //middleName
    it('Middle name should be a String', function(done){
        sampleInput.middleName.should.be.equal(String);
        done();
    })

    //lastName
    it('Last name should be a String', function(done){
        sampleInput.lastName.should.be.equal(String);
        done();
    })

    //Age
     it('Age should not be negative', function(done){
        trinketAge.should.not.be.lessThan(0);
        done();
    })

    it('Age should not be a String', function(done){
        sampleInput.age.should.be.equal(Number);
        done();
    })

    //ptrNumber
    it('ptrNumber should be a number', function(done){
        sampleInput.ptrNumber.should.be.equal(Number);
        done();
    })

    //licenceNumber
    it('licenseNumber should be a number', function(done){
        sampleInput.licenseNumber.should.be.equal(Number);
        done();
    })

    //contactNumber
    it('contactNumber should be a number', function(done){
        sampleInput.contactNumber.should.be.equal(Number);
        done();
    })

    //timeSlots
    it('timeSlots should be a String', function(done){
        sampleInput.timeSlots.should.be.equal(String);
        done()
    });

    //civilStatus
    it('civilStatus should be a String', function(done){
        sampleInput.civilStatus.should.be.equal(String);
        done();
    })

    //occupation
    it('occupation should be a String', function(done){
        sampleInput.occupation.should.be.equal(String);
        done();
    })

    //sex
    it('sex should be a String', function(done){
        sampleInput.sex.should.be.equal(String);
        done();
    })

    //birthDate
    it('birthDate should be of class Date', function(done){
        sampleInput.birthDate.should.be.equal(Date);
        done();
    })

    //referredBy
    it('referredBy should be a String', function(done){
        sampleInput.referredBy.should.be.equal(String);
        done();
    })

    //dateRegistered
    it('dateRegistered should be of class Date', function(done){
        sampleInput.dateRegistered.should.be.equal(Date);
        done();
    })

    //Get
    it('/api/users should return list of json object of users', function(done){
        request(url)
            .get('/api/users')
            .expect('Content-type', 'application/json; charset=utf-8', done)
    });


    //Post
    it('/api/users should accept complete variables', function(done) {
        request(url)
            .post('/api/users')
            .send(sampleInput)
            .expect({message: 'User successfully added!'}, done);
    });


    it('Generated ID should be equal to stored ID', function (done) {
        request(url)
            .post('/api/users')
            .send({
                username: sampleInput.username,
                password: sampleInput.password
            })
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                
            sampleInput.id = res.body._id;
            done();
            });
    });

    

    //Delete
    it('Deleting an invalid ID wont do anything', function(done){
        request(url)
            .delete('/api/users/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })

    //Edit
    it('Editing an invalid ID wont do anything', function(done){
        request(url)
            .put('/api/users/' +sampleInput.id)
            .expect(404)
            .end(function(err){
                if(err){
                    return done(err);
                }

                done();
            });
    })
});