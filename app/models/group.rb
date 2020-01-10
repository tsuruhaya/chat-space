class Group < ApplicationRecord
  has_many :memders
  has_many :users, through: :memders
  validates :name, presence: true, uniqueness: true
end
