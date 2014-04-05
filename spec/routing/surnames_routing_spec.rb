require "spec_helper"

describe SurnamesController do
  describe "routing" do

    it "routes to #index" do
      get("/surnames").should route_to("surnames#index")
    end

    it "routes to #new" do
      get("/surnames/new").should route_to("surnames#new")
    end

    it "routes to #show" do
      get("/surnames/1").should route_to("surnames#show", :id => "1")
    end

    it "routes to #edit" do
      get("/surnames/1/edit").should route_to("surnames#edit", :id => "1")
    end

    it "routes to #create" do
      post("/surnames").should route_to("surnames#create")
    end

    it "routes to #update" do
      put("/surnames/1").should route_to("surnames#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/surnames/1").should route_to("surnames#destroy", :id => "1")
    end

  end
end
