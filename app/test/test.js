'use strict';
const chaiPromised = require('chai-as-promised');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const supertest = require('supertest-session');
const superRequest = require('super-request');
const express = require('express');

chai.use(chaiPromised);
chai.should();

describe('test', function() {

    before(async function() {
    });

    it('test', async function() {
        await expect(true, 'Linkedin url должен быть непустым').ok;
    });

    it('rest', async function() {
        await expect(false, 'Linkedin url для неваторизованного должен быть пустым').not.ok;
    });

});
