require 'spec_helper'

describe "surnames/edit" do
  before(:each) do
    @surname = assign(:surname, stub_model(Surname,
      :name => "MyString"
    ))
  end

  it "renders the edit surname form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", surname_path(@surname), "post" do
      assert_select "input#surname_name[name=?]", "surname[name]"
    end
  end
end
