import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Tests for API endpoints',() =>{
    describe('Handle valid endpoints', () =>{
        describe('GET /api/v1/recipe', ()=>{
            it('it should GET all recipes', (success)=>{
                chai.request(app).get('/api/v1/recipe').end((error, res)=>{
                    expect(res).to.have.status(200);
                    success();
                });
            });
        });
        describe('GET /api/v1/recipe/:recipeid', ()=>{
            it('it should GET a recipe', (success)=>{
                chai.request(app).get('/api/v1/recipe/1').end((error, res)=>{
                    expect(res).to.have.status(200);
                    success();
                });
            });
        });
        describe('POST /api/v1/recipe', () => {
            const recipe = {
                id: 1,
                name: 'Egusi soup',
                ingredients: 'Green leaf',
                directions: 'cook',
                upvotes: 90,
            }
            it('it should POST recipes',(done)=>{
                chai.request(app).post('/api/v1/recipe').send(recipe).end((error, res)=>{
                    expect(res).to.have.status(200);
                    done();
                });
            });
        });
        
        describe('PUT /api/v1/recipe/:recipeid', ()=>{
            it('it should PUT all recipe', (success)=>{
                chai.request(app).put('/api/v1/recipe/1').end((error, res)=>{
                    expect(res).to.have.status(200);
                    success();
                });
            });
        });
        describe('DELETE /api/v1/recipe/:recipeid', ()=>{
            it('it should DELETE a recipe', (success)=>{
                chai.request(app).delete('/api/v1/recipe/1').end((error, res)=>{
                    expect(res).to.have.status(200);
                    success();
                });
            });
        });
    });

    describe('Handle invalid endpoints',()=>{
        describe('GET /api/v1/recipe',()=>{
            it('it should GET all recipes returns false',(success)=>{
                chai.request(app).get('/api/v1/recip').end((error, res)=>{
                    expect(res).to.have.status(404);
                    success();
                });
            });
        });

        describe('POST /api/v1/recipe',()=>{
            it('it should POST a recipe return false',(success)=>{
                chai.request(app).post('/api/v1/recip').end((error, res)=>{
                    expect(res).to.have.status(404);
                    success();
                });
            });
        });
        describe('PUT /api/v1/recipe',()=>{
            it('it should PUT a recipe return false',(success)=>{
                chai.request(app).put('/api/v1/recipe/:-1').end((error, res)=>{
                    expect(res).to.have.status(404);
                    success();
                });
            });
        });

        describe('DELETE /api/v1/recipe',()=>{
            it('it should DELETE a recipe return false',(success)=>{
                chai.request(app).delete('/api/v1/recipe/-1').end((error, res)=>{
                    expect(res).to.have.status(404);
                    success();
                });
            });
        });

        describe('PUT /api/v1/recipe',()=>{
            it('it should PUT a recipe return false',(success)=>{
                chai.request(app).put('/api/v1/recipe/:200').end((error, res)=>{
                    expect(res).to.have.status(404);
                    success();
                });
            });
        });

        describe('DELETE /api/v1/recipe',()=>{
            it('it should DELETE a recipe return false',(success)=>{
                chai.request(app).delete('/api/v1/recipe/-1').end((error, res)=>{
                    expect(res).to.have.status(404);
                    success();
                });
            });
        });
    });
});