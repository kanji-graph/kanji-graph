require 'spec_helper'

describe "surnames/new" do
  before(:each) do
    assign(:surname, stub_model(Surname,
      :name => "MyString"
    ).as_new_record)
  end

  it "renders new surname form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", surnames_path, "post" do
      assert_select "input#surname_name[name=?]", "surname[name]"
    end
  end
end
